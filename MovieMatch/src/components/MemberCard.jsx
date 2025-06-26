import { motion } from 'framer-motion'

export default function MemberCard(props) {

    return (
        <motion.div initial={{ scale:0 }} animate={{ scale:1 }} className="border col text-white rounded">
            <p>{props.member.name}</p>
            {
                props.isMe ? 
                    <button onClick={ props.onToggleReady } className={`${props.member.isReady ? 'bg-sucess' : 'bg-danger'}`}>{props.member.isReady ? "Ready" : "Ready up!"}</button>
                    :
                    <p>{props.member.isReady ? "Ready" : "Not Ready"}</p>
            }
        </motion.div>
    )
}