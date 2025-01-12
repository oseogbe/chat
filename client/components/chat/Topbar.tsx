import ContactDetails from "./ContactDetails"

interface TopbarProps {
    onClick: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onClick }) => {
    return (
        <div className="w-full h-[70px] border-b border-[#D9DCE0] shadow-sm flex items-center px-4">
            <ContactDetails onClick={onClick} />
        </div>
    )
}

export default Topbar