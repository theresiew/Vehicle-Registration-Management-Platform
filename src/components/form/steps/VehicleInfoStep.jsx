import { fuelTypes, purposes, vehicleStatuses, vehicleTypes } from "../../../lib/constants";
import Field, { SelectInput, TextInput } from "../../ui/Field";

function VehicleInfoStep({ register, errors }) {
  return (
    <div className="form-grid">
      <Field label="Manufacture" error={errors.manufacture?.message}>
        <TextInput placeholder="Toyota" error={errors.manufacture} {...register("manufacture")} />
      </Field>
      <Field label="Model" error={errors.model?.message}>
        <TextInput placeholder="RAV4" error={errors.model} {...register("model")} />
      </Field>
      <Field label="Body Type" error={errors.bodyType?.message}>
        <TextInput placeholder="Crossover" error={errors.bodyType} {...register("bodyType")} />
      </Field>
      <Field label="Color" error={errors.color?.message}>
        <TextInput placeholder="Silver" error={errors.color} {...register("color")} />
      </Field>
      <Field label="Vehicle Type" error={errors.vehicleType?.message}>
        <SelectInput error={errors.vehicleType} {...register("vehicleType")}>
          {vehicleTypes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </SelectInput>
      </Field>
      <Field label="Fuel Type" error={errors.fuelType?.message}>
        <SelectInput error={errors.fuelType} {...register("fuelType")}>
          {fuelTypes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </SelectInput>
      </Field>
      <Field label="Purpose" error={errors.purpose?.message}>
        <SelectInput error={errors.purpose} {...register("purpose")}>
          {purposes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </SelectInput>
      </Field>
      <Field label="Vehicle Status" error={errors.vehicleStatus?.message}>
        <SelectInput error={errors.vehicleStatus} {...register("vehicleStatus")}>
          {vehicleStatuses.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </SelectInput>
      </Field>
      <Field label="Year" error={errors.year?.message}>
        <TextInput type="number" error={errors.year} {...register("year")} />
      </Field>
      <Field label="Engine Capacity (cc)" error={errors.engineCapacity?.message}>
        <TextInput type="number" error={errors.engineCapacity} {...register("engineCapacity")} />
      </Field>
      <Field label="Odometer Reading" error={errors.odometerReading?.message}>
        <TextInput type="number" error={errors.odometerReading} {...register("odometerReading")} />
      </Field>
      <Field label="Seating Capacity" error={errors.seatingCapacity?.message}>
        <TextInput type="number" error={errors.seatingCapacity} {...register("seatingCapacity")} />
      </Field>
    </div>
  );
}

export default VehicleInfoStep;
