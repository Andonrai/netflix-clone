interface NavbarItemProps {
    children: React.ReactNode;
}

export default function NavbarItem({ children }: NavbarItemProps){
    return <div className="cursor-pointer hover:text-gray-300 transition-colors">
        {children}
    </div>
}