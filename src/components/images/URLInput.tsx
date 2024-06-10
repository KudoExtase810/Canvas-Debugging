import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/utils";
import { useRouter } from "next/navigation";
import { usePlayground } from "@/hooks/usePlayground";

interface URLInputProps {
    className?: HTMLFormElement["className"];
    tool: string;
}
const schema = z.object({
    url: z.string().url({ message: "Invalid URL" }),
});

const URLInput = ({ className, tool }: URLInputProps) => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    });

    const { setImageUrl } = usePlayground();

    const onSubmit = async (values: z.infer<typeof schema>) => {
        setImageUrl(values.url);
        router.push(`/playground/${tool}`);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cn("" && className)}>
            <Input
                {...register("url")}
                endContent={
                    <Button
                        type="submit"
                        size="lg"
                        variant="solid"
                        color="primary"
                    >
                        Start
                    </Button>
                }
                variant="flat"
                placeholder="Paste your URL..."
                size="lg"
                fullWidth
                isInvalid={!!errors.url?.message}
                errorMessage={errors.url?.message}
                classNames={{
                    inputWrapper: cn(
                        "h-28 px-8 rounded-3xl",
                        !errors.url?.message &&
                            "!bg-default-100 hover:!bg-default-100"
                    ),
                    errorMessage: "text-base mt-2 text-center",
                }}
            />
        </form>
    );
};

export default URLInput;
