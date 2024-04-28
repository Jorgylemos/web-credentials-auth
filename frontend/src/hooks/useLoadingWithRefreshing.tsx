import { useEffect, useState } from "react";
import { getUser } from "../api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { setAuth } from "../redux/user/userSlice";

export function useLoadingWithRefreshing() {

    const [loading, setLoading] = useState<boolean>(true)

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        (async () => {
            try {
                const { data } = await getUser()

                if (data) {
                    dispatch(setAuth(data))
                }

            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        })()
    }, [dispatch])

    return { loading }
}