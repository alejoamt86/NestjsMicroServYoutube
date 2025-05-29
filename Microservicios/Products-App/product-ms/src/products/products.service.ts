import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from 'generated/prisma/client';
import { PaginationDto } from 'src/common';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from 'src/common/dto/pagination.constants';


@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('ProductService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Database connected');
  }


  create(createProductDto: CreateProductDto) {
    return this.product.create({ data: createProductDto });
  }

  async findAll(paginationDto: PaginationDto) {

    const { page = DEFAULT_PAGE, limit = DEFAULT_LIMIT } = paginationDto;

    const totalPage = await this.product.count({});
    const lastpage = Math.ceil(totalPage / limit);

    return {
      data: await this.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
      }),
      meta: {
        total: totalPage,
        page: page,
        lastpage: lastpage,
      },
    };
    // return `This action returns all products`;
  }


  async findOne(id: number) {
    const product = await this.product.findUnique({
      where: {
        Id: Number(id)
      },
    });
    if (!product) {
      throw new NotFoundException(`Product with id #${id} not found`);
    }
    return product;
    // return `This action returns a #${id} product`;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    // const { id: __, ...data } = updateProductDto;
    await this.findOne(id);

    return this.product.update({
      where: { Id: id },
      data: updateProductDto,
    });
    // return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
