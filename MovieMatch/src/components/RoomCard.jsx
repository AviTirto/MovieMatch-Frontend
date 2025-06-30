import { motion } from "framer-motion";


export default function RoomCard({title, onClick})
{
    return (
        <motion.div initial={{ scale:0 }} animate={{ scale:1 }} className="card p-0" style={{ width: '18rem' }}>
            <div className="card-header">
                {title}
            </div>
            <div className="card-body">
                <button className="btn btn-primary" onClick={onClick}>{title}</button>
            </div>
        </motion.div>
    )
}