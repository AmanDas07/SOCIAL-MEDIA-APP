
import { useContext } from "react"
import React from 'react'
import { userContext } from "../../../../context/page"
import { useRouter } from "next/navigation"
import moment from "moment"
import axios from "axios"
const PeopleComp = ({ people, setupdate  }) => {
    const [state] = useContext(userContext);
    const defaultImage = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw1VAlzb3zoESTowdKT3QY8z&ust=1709845524255000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJCe1o3F4IQDFQAAAAAdAAAAABAD";
    const router = useRouter();
    const handleSubmit = async (user) => {
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/add-following`, { user }, {
                headers: {
                    Authorization: `Bearer ${state.token}`,
                }
            });
            if (data) {
                setupdate(false);
                router.push("/Dashboard")
            };

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="mt-4 ">
            {people.map((user) => (
                <div className="card m-1 p-3" key={user._id}>
                    <div className="d-flex align-items-center justify-content-between">
                        <img src={user.image && user.image.url ? user.image.url : defaultImage} alt={user.name}
                            height={50}
                            width={50}
                            style={{ borderRadius: "50%" }}
                        />
                        <h6 className="mt-2">{user.name}</h6>
                        <button className="btn btn-primary" onClick={() => handleSubmit(user)}>follow</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PeopleComp;
