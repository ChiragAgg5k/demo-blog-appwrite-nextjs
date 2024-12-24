import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { cn } from "@/lib/utils";

export default function HeroCard({
  className,
  style,
  title,
  excerpt,
  image,
}: {
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  excerpt?: string;
  image?: string;
}) {
  return (
    <Card
      className={cn(
        "w-fit hover:scale-105 transition-all duration-200 hidden lg:block",
        className,
      )}
      style={style}
    >
      {image && (
        <CardContent>
          <Image src={image} alt="Blog Card" width={300} height={200} />
        </CardContent>
      )}
      <CardHeader className="group hover:shadow-lg transition-shadow duration-200">
        <CardTitle className="group-hover:text-indigo-500 transition-colors duration-200">
          {title}
        </CardTitle>
        <CardDescription>{excerpt}</CardDescription>
      </CardHeader>
    </Card>
  );
}
