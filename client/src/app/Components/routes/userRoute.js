import { useState, useContext, useEffect } from "react";
import { userContext } from "../../../../context/page.js";
import { useRouter } from "next/navigation.js";
import axios from "axios";



const UserRoute = ({ children }) => {
    const [ok, setOk] = useState(false);
    const [state] = useContext(userContext);
    const router = useRouter();



    useEffect(() => {
        if (state && state.token) { getCurrentUser() }
    }, [state && state.token])

    const getCurrentUser = async () => {

        if (state != null) {
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_API}/currentuser`,
                {
                    headers: {
                        Authorization: `Bearer ${state.token}`,
                    },
                }
            );
            if (data.ok == true) { setOk(true); }
            //else { router.push("/login"); }
        }


        //  console.log(data.ok)

        else { router.push("/login"); }
    }



    /* catch (error) {
         router.push("/login");
         console.log(error);
     }*/





    if (typeof window !== 'undefined' && state === null) { setTimeout(() => { getCurrentUser() }, 1000) }

    return (!ok ? (<><div className="d-flex justify-content-center align-items-center" ><div className="spinner-border" style={{ marginTop: "36vh" }} role="status">
        <span className="visually-hidden">Loading...</span>
    </div>
    </div>

    </>) : (<>{children}</>)
    )

}

export default UserRoute;