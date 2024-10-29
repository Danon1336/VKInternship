// src/stores/ItemStore.test.ts
import { itemStore } from "./ItemStore";

describe("ItemStore", () => {
    beforeEach(() => {
        itemStore.repositories = [];
        itemStore.page = 1;
        itemStore.hasMore = true;
    });

    it("должен получать репозитории и добавлять их в список", async () => {
        await itemStore.fetchRepositories();
        expect(itemStore.repositories.length).toBeGreaterThan(0);
    });

    it("должен удалять репозиторий по ID", () => {
        itemStore.repositories = [{ id: 1, name: "Repo 1", description: "Desc 1", stargazers_count: 10 }];
        itemStore.deleteRepository(1);
        expect(itemStore.repositories).toHaveLength(0);
    });

    it("должен редактировать репозиторий по ID", () => {
        itemStore.repositories = [{ id: 1, name: "Repo 1", description: "Desc 1", stargazers_count: 10 }];
        itemStore.editRepository(1, { name: "Updated Repo" });
        expect(itemStore.repositories[0].name).toBe("Updated Repo");
    });
});
