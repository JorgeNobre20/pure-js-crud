import {
  addDoc,
  collection,
  firestoreDatabase,
  getDocs,
  query,
  getDoc,
  doc,
  where,
  deleteDoc,
  updateDoc,
} from "../config/FirebaseFirestoreConfig.js";

class FirestoreUserRepository {
  _collectionName = "users";

  async findAll() {
    const userCollection = query(
      collection(firestoreDatabase, this._collectionName)
    );
    const userDocuments = await getDocs(userCollection);

    const loadedData = [];

    userDocuments.forEach((userDoc) => {
      const userData = userDoc.data();

      loadedData.push({
        id: userDoc.id,
        name: userData.name,
        description: userData.description,
        email: userData.email,
      });
    });

    return loadedData;
  }

  async findById(id) {
    const docRef = doc(firestoreDatabase, `${this._collectionName}/${id}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();

      return {
        id: docSnap.id,
        name: userData.name,
        description: userData.description,
        email: userData.email,
      };
    }

    return null;
  }

  async findByEmail(email) {
    const findUserByEmailQuery = query(
      collection(firestoreDatabase, "users"),
      where("email", "==", email)
    );

    const querySnapshot = await getDocs(findUserByEmailQuery);

    let userWithEmailDoc = null;

    querySnapshot.forEach((userDoc) => {
      userWithEmailDoc = userDoc;
    });

    if (!userWithEmailDoc) {
      return null;
    }

    const userData = userWithEmailDoc.data();

    return {
      id: userWithEmailDoc.id,
      name: userData.name,
      description: userData.description,
      email: userData.email,
    };
  }

  async create({ name, email, description }) {
    await addDoc(collection(firestoreDatabase, "users"), {
      name,
      email,
      description,
    });
  }

  async update({ id, name, email, description }) {
    const docRef = doc(firestoreDatabase, `${this._collectionName}/${id}`);
    await updateDoc(docRef, {
      name,
      email,
      description,
    });
  }

  async delete(id) {
    const docRef = doc(firestoreDatabase, `${this._collectionName}/${id}`);
    await deleteDoc(docRef);
  }
}

export const firestoreUserRepository = new FirestoreUserRepository();
