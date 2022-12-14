import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Report {
  @PrimaryColumn()
  id: number;
  @Column()
  salePrice: number;
}
