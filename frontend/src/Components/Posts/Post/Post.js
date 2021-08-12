import React, { useEffect, useState } from "react";
import "./Post.css"
import { Date } from "core-js";
import { Card, Spinner } from "react-bootstrap";
import { DETA_URL, TOY_DETA_ID } from "../../../Constants/constants";
import { Link } from "react-router-dom";

function Post({ id, animal, alert_type, municipality, date, description, fromHome, picture_path }) {
    if (description === "")
        description = `${animal}:${alert_type}`

    let d = new Date(date)
    const formattedDate = d.toLocaleDateString("es-ES")
    const preview = description.substring(0, 35) + "..."
    const detaDriveName = process.env.PHOTOS_DETA_DRIVE || 'photos'
    const projectId = process.env.PROJECT_ID || TOY_DETA_ID
    const urlSuffix = `files/download?name=${picture_path}`
    
    const imgUrl = picture_path === "" ? "/default.png" : `${DETA_URL}${projectId}/${detaDriveName}/${urlSuffix}`

    const [img, setImg] = useState(null)

    // Fetch the image using the imgUrl and set the state. Add authotization headers
    useEffect(() => {
        if(imgUrl !== "/default.png")
            fetch(imgUrl, { headers: { "X-Api-Key": "b05adlw0_WSQqvBzkzp6x7XbJ6nQKA3Tx3C7nQQ6k"} })
                .then(response => response.text())
                .then(text => {
                    const pict = "data:image/png;base64," + text
                    setImg(pict)
                })
        else
            setImg(imgUrl)
    }, [imgUrl])

    return (
        <Card style={{ borderRadius: "10px 10px 0px 10px" }} className="mt-2">
            <Card.Body style={{ padding: "0px" }}>
                <Link className="Post d-flex"
                    to={`/post-details/${id}/${fromHome}`}
                    style={{
                        color: "#464646",
                        textDecoration: "none",
                        boxShadow: "1 1 1 1 blue"
                    }}
                >
                    <div>
                        {
                            !img ?
                            <Spinner variant="dark" animation="border" className="m-2" /> :
                            <img
                                src={img}
                                className="img-fluid"
                                alt=""
                                style={{
                                    height: "75px",
                                    width: "105px",
                                    borderRadius: "10px 0px 0px 10px"
                                }}
                            />
                        }
                    </div>
                    <div className="d-flex flex-column align-items-start m-2 PostWidth PostHeight">
                        <div className='d-flex justify-content-between PostWidth'>
                            <h6 className={alert_type}>{alert_type}</h6>
                            <div className="PostXSmall">{municipality}</div>
                        </div>
                        <div className="PostSmall PostBold">{preview}</div>
                        <div className="PostSmall justify-self-end">{formattedDate}</div>
                    </div>
                </Link>
            </Card.Body>
        </Card >
    );
}

export default Post;