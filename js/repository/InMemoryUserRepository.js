let data = [
  {
    id: 1,
    name: "Jorge",
    email: "jorge@email.com",
    description: "Desenvolvedor Frotend com conhecimentos em UX/UI Design",
  },
];

class InMemoryUserRepository {
  async findAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 1000);
    });
  }

  async findById(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const item = data.find((user) => user.id === Number(id));
        resolve(item);
      }, 1000);
    });
  }

  async findByEmail(email) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const item = data.find((user) => user.email === email);
        resolve(item);
      }, 1000);
    });
  }

  async create({ name, email, description }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        data.push({
          id: Number(new Date().getTime()),
          name,
          email,
          description,
        });

        resolve();
      }, 1000);
    });
  }

  async update({ id, name, email, description }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredData = data.filter((item) => item.id !== Number(id));

        filteredData.push({ id, name, email, description });
        data = filteredData;
        resolve();
      }, 1000);
    });
  }

  async delete(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredData = data.filter((item) => item.id !== Number(id));
        data = filteredData;
        resolve();
      }, 1000);
    });
  }
}

export const inMemoryUserRepository = new InMemoryUserRepository();
