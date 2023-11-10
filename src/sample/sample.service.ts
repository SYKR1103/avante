import { Injectable } from '@nestjs/common';
import { CreateSampleDto } from './dto/create-sample.dto';
import { UpdateSampleDto } from './dto/update-sample.dto';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { Repository } from 'typeorm/repository/Repository';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { Sample } from './entities/sample.entity';

@Injectable()
export class SampleService {

  constructor(
    @InjectRepository(Sample) 
    private samplerepo : Repository<Sample>
  ) {}

    async createProduct(product:CreateSampleDto) {
      const newproduct = await this.samplerepo.create(product)
      await this.samplerepo.save(newproduct)
      return newproduct}

    async getProducts() {
      return await this.samplerepo.find()
    }

    async getProductById(id:string) {
      const foundproduct = await this.samplerepo.findOneBy({id})
      if (foundproduct) {return foundproduct}
      throw new HttpException('not found', HttpStatus.NOT_FOUND)
    }

    async updateProductById(id:string, product:CreateSampleDto) {
      await this.samplerepo.update(id, product)
      const updatedproduct = await this.samplerepo.findOneBy({id})
      if (updatedproduct) {return updatedproduct}
      throw new HttpException('not found', HttpStatus.NOT_FOUND)
    }

    async deleteProductById(id:string) {
      const deleteresponse = await this.samplerepo.delete(id)
      if (!deleteresponse.affected) {throw new HttpException('not found', HttpStatus.NOT_FOUND)}
    
    return "deleted"
    }

}
