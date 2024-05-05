```tsx
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";

const UpdateUserInfoDialog = dynamic(
  () =>
    import("../_components/update-user-info-dialog").then(
      (mod) => mod.UpdateUserInfoDialog,
    ),
  {
    ssr: false,
    loading: () => (
      <Button size="icon">
        <PencilIcon />
      </Button>
    ),
  },
);
```

- capitals
