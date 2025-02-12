import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('items', (table) => {
    table.increments('id').primary();
    table.string('name', 255).notNullable();
    table.string('description', 255).nullable();
    table.decimal('price', 10, 2).notNullable();
    table.enu("status", ["publish", "draft", "deleted"]);
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("items");
}
