import { motion } from "framer-motion";


export default function MemberCard(props) {

    return (
        <motion.div initial={{ scale:0 }} animate={{ scale:1 }} className="border-1 rounded-lg shadow-md flex flex-row justify-center space-x-5">
            <p>{props.member.name}</p>
            {
                props.isMe ? 
                    <button onClick={ props.onToggleReady } className={`bg-white p-1 ${props.member.isReady ? 'bg-sucess' : 'bg-danger'}`}>{props.member.isReady ? "Ready" : "Ready up!"}</button>
                    :
                    <p>{props.member.isReady ? "Ready" : "Not Ready"}</p>
            }
        </motion.div>
    )
}