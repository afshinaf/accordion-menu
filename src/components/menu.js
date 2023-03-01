import Header from './header';
import AccordionMenu from "./accordion-menu";

const Menu = () => {
    return (
        <>
            <div className="box d-flex flex-column">
                <Header />
                <AccordionMenu collapse={true}/>
            </div>
        </>
    )
}

export default Menu
