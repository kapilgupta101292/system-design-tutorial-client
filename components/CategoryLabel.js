import Link from "next/link";

export default function CategoryLabel({children}) {
    const colorKey = {
        JavaScript: 'bg-yellow-600',
        CSS: 'bg-blue-600', 
        Python: 'bg-green-600', 
        PHP: 'bg-purple-600',
        Ruby: 'bg-red-600'
    }
    return (
        <div className={`px-2 py-1 ${colorKey[children]} text-gray-100 font-bold rounded`}>
            <Link href={`/blog/category/${children.toLowerCase()}`}>
                {children}
            </Link>

        </div>
    )
}