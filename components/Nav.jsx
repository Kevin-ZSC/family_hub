import Image from "next/image";
import Link from "next/link";

const Nav = () => {
  return (
    <div className="bg-slate-300 flex justify-between items-center px-4 py-4">
      <div>
        <Link href="/">
          <Image src="/family.png" width={50} height={50} alt="family image" className='cursor-pointer' />
        </Link>
      </div>
      
      <nav className="flex gap-5">
        <Link href="/post">
          <Image src="/post.png" width={50} height={50} alt="post image" className="cursor-pointer" />
        </Link>
        
        <Link href="/calendar">
          <Image src="/calendar.png" width={50} height={50} alt="post image" className='cursor-pointer' />
        </Link >
        <Link href="/gallery">
          <Image src="/gallery.png" width={50} height={50} alt="post image" className='cursor-pointer' />
        </Link >
        <Link href="/contact">
          <Image src="/chat-box.png" width={50} height={50} alt="post image" className='cursor-pointer' />
        </Link >
      </nav>

      <div>
        <Image src="/user.png" width={50} height={50} alt="family image" className='cursor-pointer' />
      </div>
    </div>
  );
};

export default Nav;
