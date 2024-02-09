import Image from "next/image";

const Loader = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-y-4">
        <div className="h-32 w-32">
            <Image 
                alt="loading"
                src="/loading.gif"
                width={320}
                height={320}
            />
        </div>
        <p className="text-sm text-muted-foreground">Fetching News from different sources...</p>
    </div>
  )
}

export default Loader;