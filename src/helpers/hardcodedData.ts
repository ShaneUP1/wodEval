import { HingeType, MovementPattern, OlyType, PressType, PullType, SquatType } from './enums';

export const movementOptionsData = [
    // Squat
    { value: SquatType.BackSquat, label: 'Back Squat', pattern: [MovementPattern.Squat] },
    { value: SquatType.FrontSquat, label: 'Front Squat', pattern: [MovementPattern.Squat] },
    { value: SquatType.OverheadSquat, label: 'Overhead Squat', pattern: [MovementPattern.Squat] },
    { value: SquatType.AirSquat, label: 'Air Squat', pattern: [MovementPattern.Squat] },
    { value: SquatType.Pistol, label: 'Pistol', pattern: [MovementPattern.Squat] },
    { value: SquatType.StepUp, label: 'Step Up', pattern: [MovementPattern.Squat] },
    // Hinge
    { value: HingeType.Deadlift, label: 'Deadlift', pattern: [MovementPattern.Hinge] },
    { value: HingeType.SumoDeadlift, label: 'Sumo Deadlift', pattern: [MovementPattern.Hinge] },
    // Press
    { value: PressType.Press, label: 'Press', pattern: [MovementPattern.VerticalPress] },
    { value: PressType.PushPress, label: 'Push Press', pattern: [MovementPattern.VerticalPress] },
    { value: PressType.PushJerk, label: 'Push Jerk', pattern: [MovementPattern.VerticalPress] },
    { value: PressType.SplitJerk, label: 'Split Jerk', pattern: [MovementPattern.VerticalPress] },
    { value: PressType.HandstandPushup, label: 'Handstand Push-Up', pattern: [MovementPattern.VerticalPress] },
    { value: PressType.Dip, label: 'Dip', pattern: [MovementPattern.VerticalPress] },
    { value: PressType.Pushup, label: 'Push-Up', pattern: [MovementPattern.HorizontalPress] },
    { value: PressType.BenchPress, label: 'Bench Press', pattern: [MovementPattern.HorizontalPress] },
    // Pull
    { value: PullType.Pullup, label: 'Pull-Up', pattern: [MovementPattern.VerticalPull] },
    { value: PullType.Chinup, label: 'Chin-Up', pattern: [MovementPattern.VerticalPull] },
    { value: PullType.MuscleUp, label: 'Muscle-up', pattern: [MovementPattern.VerticalPull] },
    { value: PullType.RingRow, label: 'Ring Row', pattern: [MovementPattern.HorizontalPull] },
    // Olympic Lifts
    { value: OlyType.Snatch, label: 'Snatch', pattern: [MovementPattern.OlyLift] },
    { value: OlyType.Clean, label: 'Clean', pattern: [MovementPattern.OlyLift] }
];
