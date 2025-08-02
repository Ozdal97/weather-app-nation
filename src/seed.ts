import { AppDataSource } from '../data-source';
import { User, UserRole } from './users/user.entity';
import * as bcrypt from 'bcryptjs';

async function seed() {
  const dataSource = await AppDataSource.initialize();
  const userRepo = dataSource.getRepository(User);

  const email = 'admin@example.com';
  const exists = await userRepo.findOne({ where: { email } });
  if (!exists) {
    const user = userRepo.create({
      email,
      role: UserRole.ADMIN,
      password: await bcrypt.hash('password123', 10),
    });
    await userRepo.save(user);
    console.log(`Seed: Created admin user (${email}/password123)`);
  } else {
    console.log(`Seed: Admin user (${email}) already exists`);
  }

  await dataSource.destroy();
}

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
