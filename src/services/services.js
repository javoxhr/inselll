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
        localStorage.setItem('token', res?.data?.access_token)
    }
    console.log(res)
}

export const getUsers = async (page = 0, limit = 25, branchId = 0) => {
    const store = useStore();
        const res = await service.get(`/get_users?branch_id=${branchId}&page=${page}&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${store.token}`,
            },
        });

        if (res.status === 200) {
            store.authSwitch = false;
        }

        return res.data;
};

export const createEmp = async (body) => {
    const store = useStore()
    const res = await service.post("/create_user", body, {
        headers: {
            Authorization: `Bearer ${store.token}`,
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
            'Authorization': `Bearer ${store.token}`,
        }
    })
    console.log(res)
}


export const getDavomat = async ()=> {
    const store = useStore()
    const res = await service.get("/get_davomat?branch_id=0&user_id=0&page=0&limit=25", {
        headers: {
            Authorization: `Bearer ${store.token}`
        }
    })
    return res
}

export const getTaminotlar = async ()=> {
    const store = useStore()
    const res = await service.get("/get_parties?status=false&page=0&limit=25&branch_id=1", {
        headers: {
            Authorization: `Bearer ${store.token}`
        }
    })
    console.log(res)
    return res
}

export const getKassa = async ()=> {
    const store = useStore()
    const res = await service.get("/get_markets?search=asdasd&branch_id=0&page=0&limit=25", {
        headers: {
            Authorization: `Bearer ${store.token}`
        }
    })
    console.log(res);
    return res
}

export const taminot = async (body)=> {
    const store = useStore()
    const res = await service.post("/take_supply", body,{
        headers: {
            Authorization: `Bearer ${store.token}`
        }
    })
    return res
}
