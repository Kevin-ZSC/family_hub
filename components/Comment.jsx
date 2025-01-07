import Image from "next/image";

const Comment = () => {
  return (
    <div className="flex items-start space-x-3 bg-gray-100 p-4 rounded-lg shadow-md w-full max-w-md relative">
      {/* User Avatar */}
      <Image
        src="/family.png"
        width={40}
        height={40}
        alt="family"
        className="rounded-full"
      />

      {/* Comment Input */}
      <div className="flex-1 relative">
        <textarea
          id="comment-input"
          placeholder="Write a comment..."
          className="w-full border border-gray-300 rounded-lg p-2 pr-10 text-sm shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
        ></textarea>

        {/* Send Icon */}
        
          <Image
            src="/send.png"
            width={16}
            height={16}
            alt="send"
            className="object-contain absolute bottom-4 right-3 flex items-center justify-center cursor-pointer"
          />
        
      </div>
    </div>
  );
};

export default Comment;
