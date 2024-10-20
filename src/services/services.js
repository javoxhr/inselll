import axios from "axios";
import { useStore } from "@/stores/counter";

const service = axios.create({
    baseURL: "https://demo.api-insell.uz",
    headers: {
        'Content-Type': 'application/json',
    },
});

export const token = async (username, password) => {
    const params = new URLSearchParams();
    params.append('grant_type', '');
    params.append('username', username);
    params.append('password', password);
    params.append('scope', '');
    params.append('client_id', '');
    params.append('client_secret', '');

    const res = await service.post("/token", params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'accept': 'application/json'
        }
    })
    if(res.data) {
        localStorage.setItem('data', JSON.stringify(res))
        setTimeout(()=> {
            window.location.reload(true)
        }, 1000)
    }
}

export const getUsers = async (page = 0, branchId = 0) => {
    const store = useStore();
    
    const res = await service.get(`/get_users?branch_id=${branchId}&page=${page}`, {
        headers: {
            Authorization: `Bearer ${store.data.data.access_token}`,
        },
    });

    if (res.status === 200) {
        store.authSwitch = false;
    }
    return {
        users: Array.isArray(res.data.data) ? res.data.data : [],
        hasMore: res.data.pages > page + 1
    };
};


export const createEmp = async (body) => {
    const store = useStore()
    const res = await service.post("/create_user", body, {
        headers: {
            Authorization: `Bearer ${store.data.data.access_token}`,
        }
    })
    if(res.status == 200) {
       store.createUser = false
       store.noti = true
       setTimeout(()=> {
        store.noti = false
       }, 2000)
       setTimeout(()=> {
        window.location.reload(true)
       }, 3000)
    }
    return res
}

export const updateEmp = async (body)=> {
    const store = useStore()
    const res = await service.put("/update_user", body, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.data.data.access_token}`,
        }
    })
    console.log(res)
}


export const fetchDavomatFromApi = async ({ branchId, userId, fromTime, toTime, page, limit }) => {
    const store = useStore(); // Получаем store

    try {
        const res = await service.get("/get_davomat", {
            params: {
                branch_id: branchId,
                user_id: userId,
                from_time: fromTime,
                to_time: toTime,
                page,
                limit
            },
            headers: {
                Authorization: `Bearer ${store.data.data.access_token}`, // Авторизация через токен
            }
        });

        return res;
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        throw error; // Пробрасываем ошибку, чтобы можно было обрабатывать её выше
    }
};

export const enterUser = async (id)=> {
    const store = useStore()
    const res = await service.post("/enter_user", id, {
        headers: {
            Authorization: `Bearer ${store.data.data.access_token}`,
            "Content-Type": `application/json`
        }
    })
    console.log(res)
    return res
}

export const closeUser = async (data)=> {
    const store = useStore()
    const res = await service.put("/close_user", data, {
        headers: {
            Authorization: `Bearer ${store.data.data.access_token}`,
            "Content-Type": `application/json`
        }
    })
    console.log(data)
    return res
}