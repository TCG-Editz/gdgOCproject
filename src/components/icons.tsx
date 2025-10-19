import Image from "next/image";
import type { SVGProps } from "react";

export const Icons = {
  logo: (props: Omit<React.ComponentProps<typeof Image>, 'src' | 'alt'>) => (
    <Image
      src="/image/OnCampuslogo.png"
      alt="OnCampus Logo"
      width={129}
      height={26}
      {...props}
    />
  ),
};
