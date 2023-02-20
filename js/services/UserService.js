import { firestoreUserRepository } from "../repository/index.js";
import { UserMapper } from "../mapping/UserMapper.js";

class UserService {
  async getById(id) {
    const data = await firestoreUserRepository.findById(id);

    if (!data) {
      throw new Error("Usuário não encontrado");
    }

    return UserMapper.mapRepositoryToModel(data);
  }

  async getAll() {
    const data = await firestoreUserRepository.findAll();
    return UserMapper.mapCollectionRepositoryToModel(data);
  }

  async create({ name, email, description }) {
    const existingUser = await firestoreUserRepository.findByEmail(email);

    if (existingUser) {
      throw new Error(
        `O email ${email} já está sendo utilizado por outro usuário`
      );
    }

    await firestoreUserRepository.create({ name, email, description });
  }

  async update({ id, name, email, description }) {
    await this.getById(id);

    const existingUser = await firestoreUserRepository.findByEmail(email);

    if (existingUser && id !== existingUser.id) {
      throw new Error(
        `O email ${email} já está sendo utilizado por outro usuário`
      );
    }

    await firestoreUserRepository.update({ id, name, email, description });
  }

  async delete(id) {
    await this.getById(id);
    await firestoreUserRepository.delete(id);
  }
}

export const userService = new UserService();
