import { integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  credits: integer('credits').default(5)
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content"),
  authorId: integer("author_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const agentConfig = pgTable('agentConfig', {
  id: serial("id").primaryKey(),
  agentId: varchar("agent_id").notNull(),
  name: varchar("name").notNull(),
  description: text("description"),
  agentImage: text("agent_image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  userEmail: text("user_email").notNull().references(() => users.email)
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
