import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-primary text-primary-foreground hover:scale-105 hover:shadow-primary active:scale-95",
        secondary: "bg-gradient-secondary text-secondary-foreground hover:scale-105 hover:shadow-secondary active:scale-95",
        success: "bg-success text-success-foreground hover:bg-success/90 hover:scale-105 active:scale-95",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:scale-105 active:scale-95",
        outline: "border-2 border-primary/20 bg-card text-foreground hover:border-primary/40 hover:bg-primary/5 hover:scale-105 active:scale-95",
        ghost: "text-foreground hover:bg-accent hover:text-accent-foreground hover:scale-105 active:scale-95",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary-glow",
        hero: "bg-gradient-hero text-primary-foreground shadow-glow hover:scale-110 hover:shadow-primary active:scale-100 relative before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700",
        voice: "bg-success text-success-foreground hover:bg-success-glow hover:scale-110 active:scale-95 transition-all duration-200",
        choice: "bg-card border-2 border-primary/10 text-card-foreground hover:border-primary/30 hover:bg-primary/5 hover:scale-105 active:scale-100 hover:shadow-card transition-all duration-300",
        floating: "bg-card/80 backdrop-blur-md border border-primary/20 text-card-foreground hover:bg-card hover:scale-105 hover:shadow-card active:scale-95"
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-16 rounded-xl px-10 text-lg",
        xl: "h-20 rounded-2xl px-12 text-xl",
        icon: "h-12 w-12",
        "icon-sm": "h-9 w-9",
        "icon-lg": "h-16 w-16",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }