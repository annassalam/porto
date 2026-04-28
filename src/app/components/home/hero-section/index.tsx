import Image from "next/image"
import Link from "next/link";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
    const socialIcon = [
        {
            img: "/images/icon/twitter-icon.svg",
            href: "https://x.com/AlaikAnnasSalam",
            icon: "Twitter"
        },
        {
            img: "/images/icon/facebook-icon.svg",
            href: "https://www.facebook.com/profile.php?id=61588813971584",
            icon: "Behance"
        },
        {
            img: "/images/icon/instagram-icon.svg",
            href: "https://www.instagram.com/ashabu_rayyati_suud?igsh=bWQ5YTU3Z21reDZp",
            icon: "Dribble"
        },
    ];
    return (
        <section>
            <div className="container">
                <div className="">
                    <div className="w-full h-72">
                        <Image src={"/images/hero-sec/banner-img.png"} alt="banner-img" width={1080} height={267} className="w-full h-full object-cover" />
                    </div>
                    <div className="border-x border-primary/10">
                        <div className="relative flex flex-col xs:flex-row items-center xs:items-start justify-center xs:justify-between max-w-3xl mx-auto gap-10 xs:gap-3 px-4 sm:px-7 pt-22 pb-8 sm:pb-12">
                            <div className="absolute top-0 transform -translate-y-1/2">
                                <Image src={"/images/hero-sec/user-img-new.png"} alt="user-img" width={145} height={145} className="border-4 border-white rounded-full" />
                                <span className="absolute bottom-2.5 right-5 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                            </div>
                            <div className="flex flex-col gap-2 sm:gap-3 items-center text-center xs:items-start">
                                <h1>ALAIK ANNAS SALAM</h1>
                                <p className="text-violet-700 font-normal">Junior Software Developer/Engineer</p>
                                <div className="flex items-center gap-2">
                                    <Image src={"/images/icon/map-icon.svg"} alt="map-icon" width={20} height={20} />
                                    <p className="text-primary">Kediri, Jawa Timur</p>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row items-center gap-4">
                                <div className="flex items-center gap-2">
                                    {socialIcon?.map((value, index) => {
                                        return (
                                            <Link href={value?.href} key={index} className="w-fit p-2.5 sm:p-3.5 hover:bg-primary/5 border border-primary/10 rounded-full">
                                                <Image src={value?.img} alt={value?.icon} width={18} height={18} />
                                            </Link>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection

