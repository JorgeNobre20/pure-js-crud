import { UserModel } from "../model/UserModel.js";

export class UserMapper {
  static mapRepositoryToModel(respositoryData) {
    const userModel = new UserModel();

    userModel.id = respositoryData.id;
    userModel.name = respositoryData.name;
    userModel.email = respositoryData.email;
    userModel.description = respositoryData.description;

    return userModel;
  }

  static mapCollectionRepositoryToModel(repositoryCollection) {
    return repositoryCollection.map((repositoryData) =>
      this.mapRepositoryToModel(repositoryData)
    );
  }
}
