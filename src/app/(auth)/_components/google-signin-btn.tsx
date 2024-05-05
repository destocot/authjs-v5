import { Button } from "@/components/ui/button";
import { SiGoogle, SiGoogleHex } from "@icons-pack/react-simple-icons";
import { signinWithOath } from "@/lib/actions";

type GoogleSigninBtnProps = { signup?: boolean };

export const GoogleSigninBtn = ({ signup }: GoogleSigninBtnProps) => {
  return (
    <form action={signinWithOath.bind(null, "google")}>
      <Button type="submit" variant="secondary" className="w-full space-x-4">
        <SiGoogle color={SiGoogleHex} size={18} />
        <span>Sign {signup ? "up" : "in"} with Google</span>
      </Button>
    </form>
  );
};
