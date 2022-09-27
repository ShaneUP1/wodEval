import { MovementPattern, SquatType } from './enums';

export const movementOptionsData = [
    // Squats
    { value: SquatType.BackSquat, label: 'Back Squat', pattern: MovementPattern.Squat },
    { value: SquatType.FrontSquat, label: 'Front Squat', pattern: MovementPattern.Squat },
    { value: SquatType.OverheadSquat, label: 'Overhead Squat', pattern: MovementPattern.Squat },
    { value: SquatType.AirSquat, label: 'Air Squat', pattern: MovementPattern.Squat },
    { value: SquatType.Pistol, label: 'Pistol', pattern: MovementPattern.Squat },
    { value: SquatType.StepUp, label: 'Step Up', pattern: MovementPattern.Squat }
    //
];
