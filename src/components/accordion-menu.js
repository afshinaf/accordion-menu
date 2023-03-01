import { useState, useEffect } from "react";
import axios from'axios'
import Accordion from 'react-bootstrap/Accordion';

const AccordionMenu = () => {

    const baseUrl                     = 'https://mohsenfathipour.com';
    const apiUrl                      = `${baseUrl}/api/categories.json`;
    const [categories, setCategories] = useState([]);

    useEffect( () => {
        getItems()
    },[])

    const getItems = async () => {
        const items = await axios
            .get(apiUrl)
            .then((response) => {
                setCategories(response.data)
            })
            .catch((error) => console.error(error))
        return items;
    }

    const builtAccordion = (item) => {
        if (item.children.length === 0)
            return (
                <Accordion.Item className="border border-0">
                    <ul className="list-group border border-0 px-0">
                        <li className="list-group-item list-group-item-action border border-0 bg-dark.bg-gradient my-1">
                            <a href={`${baseUrl}${item.link}`} className="text-decoration-none">{item.name}</a>
                        </li>
                    </ul>
                </Accordion.Item>
            )
        return (
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>{item.name}</Accordion.Header>
                    <Accordion.Body>{item.children.map((i) => builtAccordion(i))}</Accordion.Body>
                </Accordion.Item>
            </Accordion>
        )
    }

    return categories.map((category, index) => {
        return (
            <Accordion>{builtAccordion(category)} </Accordion>
        )
    })
}

export default AccordionMenu
