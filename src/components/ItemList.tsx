
import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { itemStore } from "../stores/ItemStore.ts";
import { Button, List, Spin } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";

    const ItemList: React.FC = observer(() => {
    useEffect(() => {
        itemStore.fetchRepositories(); // Первоначальная загрузка данных
    }, []);

    const handleEdit = (id: number) => {
        const newName = prompt("Введите новое название:");
        if (newName) {
        itemStore.editRepository(id, { name: newName });
        }
    };

    const handleDelete = (id: number) => {
        itemStore.deleteRepository(id);
    };

    return (
        <InfiniteScroll
        dataLength={itemStore.repositories.length}
        next={() => itemStore.fetchRepositories()}
        hasMore={itemStore.hasMore}
        loader={<Spin />}
        >
        <List
            dataSource={itemStore.repositories}
            renderItem={(repo) => (
            <List.Item
                actions={[
                <Button onClick={() => handleEdit(repo.id)}>Изменить</Button>,
                <Button danger onClick={() => handleDelete(repo.id)}>Удалить</Button>,
                ]}
            >
                <List.Item.Meta
                title={repo.name}
                description={repo.description || "Описание отсутствует"}
                />
                <div>⭐ {repo.stargazers_count}</div>
            </List.Item>
            )}
        />
        </InfiniteScroll>
    );
    });

export default ItemList;
