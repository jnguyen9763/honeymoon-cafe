import React, { useRef } from "react";
import { db } from "../firebase";
import { addDoc, collection } from "@firebase/firestore"


export default function Test() {
    const messageRef = useRef();
    const ref = collection(db, "messages");

    const handleSave = async (e) => {
        e.preventDefault();
        console.log(messageRef.current.value);
        
        let data = {
            message: messageRef.current.value,
        };

        try {
            addDoc(ref, data);
        } catch (e) {
            console.log(e);
        }

    }

    return (
        <div>
            <form onSubmit={handleSave}>
                <label>Enter Message</label>
                <input type="text" ref={messageRef} />
                <button type="submit">Save</button>
            </form>
        </div>
    )
}