import ContactDetails from "./ContactDetails"

interface TopbarProps {
    onClick: () => void;
    contactName: string;
}

const Topbar: React.FC<TopbarProps> = ({ onClick, contactName }) => {
    return (
        <div className="w-full h-[70px] shrink-0 border-b border-[#D9DCE0] shadow-sm flex items-center px-4">
            <ContactDetails onClick={onClick} contactName={contactName} />
        </div>
    )
}

export default Topbar