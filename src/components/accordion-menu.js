import { useState, useEffect } from "react";
import axios from'axios'
import Accordion from 'react-bootstrap/Accordion';

const AccordionMenu = () => {

    const apiUrl                      = 'https://mohsenfathipour.com/api/categories.json';
    const [categories, setCategories] = useState([]);

    useEffect( () => {
        getItems()
    },[])

    const getItems = async () => {
        const items = await axios.get(apiUrl)
            .then((response) => {
                setCategories(response.data)
            })
            .catch((error) => console.error(error))
        return items;
    }

    return (
        categories.map((category, index) => {
            return(
                <Accordion defaultActiveKey={`${index}`}>
                    <Accordion.Item eventKey={`${index}`}>
                        <Accordion.Header>{category.name}</Accordion.Header>
                        <Accordion.Body>
                            {
                                !!category.children ? category.children.map((child, index) => (
                                    !!child.children ? (
                                        <Accordion defaultActiveKey={`${index + 1}`}>
                                            <Accordion.Item eventKey={`${index + 1}`}>
                                                <Accordion.Header>{child.name}</Accordion.Header>
                                                <Accordion.Body>

                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    ) : (
                                        <a>{child.name}</a>
                                    )
                                )) : <div style={{backgroundColor: "red"}}> NO child </div>
                            }
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            )
        })
    );
}

export default AccordionMenu
