import { Button } from "@/components/ui/button";
import { SiGithub, SiGithubHex } from "@icons-pack/react-simple-icons";
import { signinWithOath } from "@/lib/actions";

type GithubSigninBtnProps = { signup?: boolean };

export const GithubSigninBtn = ({ signup }: GithubSigninBtnProps) => {
  return (
    <form action={signinWithOath.bind(null, "github")}>
      <Button type="submit" variant="secondary" className="w-full space-x-4">
        <SiGithub color={SiGithubHex} size={18} />
        <span>Sign {signup ? "up" : "in"} with Github</span>
      </Button>
    </form>
  );
};
