-- CreateTable
CREATE TABLE `Animals` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT NULL,
    `image_url` VARCHAR(255) NULL,
    `category` VARCHAR(50) NULL,
    `birth` DATETIME(3) NULL,
    `age` INTEGER NULL,
    `is_available` ENUM('available', 'adopted') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
