import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import Styles from "../Styles/snackbar.module.css"

export const Snackbar = forwardRef((props, ref) => {
    const [isActive, setActive] = useState(false);
    const [message, setMessage] = useState("Some error occured...");
    useEffect(() => {
        if (isActive) {
          const timeoutId = setTimeout(() => {
            setActive(false);
          }, 3000);
          return () => clearTimeout(timeoutId);
        }
      }, [isActive]);
    useImperativeHandle(ref, () => ({
        openSnackBar: (msg = 'Something went wrong...') => {
            setMessage(msg);
            setActive(true)
        },
    }));
    
      return (
          <div className = {isActive ? [Styles.snackbar, Styles.show].join(" ") : Styles.snackbar}>
            {message}
          </div>
      );
})
