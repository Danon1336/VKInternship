import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";

interface Repository {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  // Типизация для React
}

class ItemStore {
  repositories: Repository[] = [];
  page = 1;
  loading = false;
  hasMore = true;

  constructor() {
    makeAutoObservable(this);
  }

  // Получение репозиториев с GitHub API с пагинацией
  async fetchRepositories() {
    if (this.loading || !this.hasMore) return;

    this.loading = true;
    try {
      const response = await axios.get(
        `https://api.github.com/search/repositories`,
        {
          params: {
            q: "javascript",
            sort: "stars",
            order: "asc",
            page: this.page,
            per_page: 10,
          },
        }
      );
      
      runInAction(() => {
        // Обновляем список репозиториев и параметры пагинации
        this.repositories = [...this.repositories, ...response.data.items];
        this.page += 1;
        this.hasMore = response.data.items.length > 0;
      });
    } catch (error) {
      console.error("Не удалось получить репозитории:", error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
  //Локальное удаление репозитория
  deleteRepository(id: number) {
    this.repositories=this.repositories.filter(repo=>repo.id!==id);
  }
  //Локальное редактирование репозитория
  editRepository(id: number, updatedRepo: Partial<Repository>) {
    this.repositories = this.repositories.map(repo =>
      repo.id === id?
    {...repo,...updatedRepo} : repo
    );
  }
}
export const itemStore = new
ItemStore();
