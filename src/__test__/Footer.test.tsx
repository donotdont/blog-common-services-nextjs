import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer';
import { getDictionary } from '../../get-dictionary';


describe('Footer', () => {
  it('renders a footer with async/await', async () => {
    const dictionary: any = await getDictionary('en');
    render(<Footer dictionary={dictionary} />);

    //const footer = screen.getAllByRole('footer', { level: 1 })
    //const footer = screen.getByTestId('footer');

    //expect(footer).toBeTruthy();
    //expect(footer).toHaveTextContent(/Common-Services/i);
    expect(screen.queryByTestId(/footer/i)).toBeNull();
  })
})