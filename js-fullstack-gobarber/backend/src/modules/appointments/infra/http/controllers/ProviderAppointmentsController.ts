import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';
import { classToClass } from 'class-transformer';

export default class ProviderAppointmentController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { day, month, year } = request.query;

    const listProviderApointments = container.resolve(
      ListProviderAppointmentsService,
    );

    const appointments = await listProviderApointments.execute({
      provider_id,
      year: Number(year),
      month: Number(month),
      day: Number(day),
    });

    return response.json(classToClass(appointments));
  }
}
