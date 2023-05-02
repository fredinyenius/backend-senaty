-- AlterTable
ALTER TABLE "productos" ALTER COLUMN "imagen" DROP NOT NULL,
ALTER COLUMN "imagen" SET DEFAULT 'https://www.google.com/me.jpg';
