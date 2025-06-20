interface MobileMenuProps {
  visible?: boolean;
}

export default function MobileMenu({ visible }: MobileMenuProps) {
  if (!visible) {
    return null;
  }
  return (
    <div className="bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-4">
        <div className="px-3 text-center hover:underline">Home</div>
        <div className="px-3 text-center hover:underline">Series</div>
        <div className="px-3 text-center hover:underline">Films</div>
        <div className="px-3 text-center hover:underline">New & Popular</div>
        <div className="px-3 text-center hover:underline">My List</div>
        <div className="px-3 text-center hover:underline">Browse by Languages</div>
      </div>
    </div>
  );
}
