import { useEffect } from "react";
import { useLocation } from "react-router-dom";

//hook to scroll app to # section after navigation to another page (SPA behavior)
export default function useScrollToHash(){
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const id = hash.replace("#", "");
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({behavior: "smooth"})
            }
        }
    }, [hash])
}