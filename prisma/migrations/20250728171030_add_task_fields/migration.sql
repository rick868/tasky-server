-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "labels" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "priority" TEXT NOT NULL DEFAULT 'Medium',
ADD COLUMN     "project" TEXT,
ALTER COLUMN "description" DROP NOT NULL;
