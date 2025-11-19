import { sql } from "drizzle-orm";
import { pgTable, text, varchar, real, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const predictions = pgTable("predictions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  glucose: real("glucose").notNull(),
  bloodPressure: real("blood_pressure").notNull(),
  skinThickness: real("skin_thickness").notNull(),
  insulin: real("insulin").notNull(),
  bmi: real("bmi").notNull(),
  diabetesPedigreeFunction: real("diabetes_pedigree_function").notNull(),
  age: integer("age").notNull(),
  pregnancies: integer("pregnancies").default(0),
  physicalActivity: integer("physical_activity").notNull(),
  familyHistory: boolean("family_history").notNull().default(false),
  smokingStatus: boolean("smoking_status").notNull().default(false),
  riskScore: real("risk_score").notNull(),
  riskCategory: text("risk_category").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPredictionSchema = createInsertSchema(predictions).omit({
  id: true,
  riskScore: true,
  riskCategory: true,
  createdAt: true,
}).extend({
  glucose: z.number().min(0).max(500),
  bloodPressure: z.number().min(0).max(200),
  skinThickness: z.number().min(0).max(100),
  insulin: z.number().min(0).max(1000),
  bmi: z.number().min(10).max(70),
  diabetesPedigreeFunction: z.number().min(0).max(2.5),
  age: z.number().int().min(1).max(120),
  pregnancies: z.number().int().min(0).max(20).optional(),
  physicalActivity: z.number().int().min(0).max(7),
  familyHistory: z.boolean(),
  smokingStatus: z.boolean(),
});

export type InsertPrediction = z.infer<typeof insertPredictionSchema>;
export type Prediction = typeof predictions.$inferSelect;
