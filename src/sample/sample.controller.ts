import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SampleService } from './sample.service';
import { CreateSampleDto } from './dto/create-sample.dto';
import { UpdateSampleDto } from './dto/update-sample.dto';

@Controller('sample')
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}

  @Post()
  async createProduct(@Body() product:CreateSampleDto) {
    return await this.sampleService.createProduct(product)
  }

  @Get("all")
  async getProducts() {return await this.sampleService.getProducts()}

  @Get(':id')
  async getProductById(@Param("id") id:string) {return await this.sampleService.getProductById(id)}

  @Patch(':id')
  async updateProductById(@Param("id") id:string, @Body() product:CreateSampleDto) {return this.sampleService.updateProductById(id, product)}

  @Delete(':id')
  async deleteProductById(@Param("id") id:string) {return await this.sampleService.deleteProductById(id)}
}
